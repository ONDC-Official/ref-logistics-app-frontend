import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
// import { UnControlled as CodeMirror } from 'react-codemirror2'
import ReactJson from 'react-json-view'
import ReactFlow, { Background, BackgroundVariant, useNodesState, useEdgesState, MarkerType } from 'reactflow'
import JSZip from 'jszip'
import Button from 'components/Button'
import CustomNode from 'components/CustomNode'
import TextInput from 'components/TextInput'
import SearchIcon from 'assets/svg/SearchIcon'
import DownloadIcon from 'assets/svg/DownloadIcon'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import {
  MainWrapper,
  HeadingWrapper,
  Container,
  MainHeading,
  ActivityWrapper,
  InformationWrapper,
  SearchWrapper,
  InputWrapper,
  RecordsWrapper,
  LeftRecordsWrapper,
  RecordLabel,
  RightRecordsWrapper,
  MenuItem,
  MenuItemWrapper,
  EmptyMenuItem,
  ButtonWrapper,
  CodeMirrorWrapper,
} from 'styles/views/requestLog'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript.js'
import 'reactflow/dist/style.css'

interface ISelectedRequest {
  index: null | number
  data: any
}

const RequestLogDetail = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), [])
  const { id }: { id: string } = useParams()
  const { control, handleSubmit } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      search: id != 'new' ? id : '',
    },
  })

  const [searchedText, setSearchedText] = useState(id || '')
  const [selectedRequest, setSelectedRequest] = useState<ISelectedRequest>({
    index: 1,
    data: {},
  })

  const { refetch: fetchRequestLogs, data: requestLogs } = useGet(
    'requestLogs',
    `${APIS.REQUEST_LOGS}?transaction_id=${searchedText || id}`,
  )

  const requestLogDetails = requestLogs?.data && requestLogs.data?.length ? [...requestLogs.data] : []
  useEffect(() => {
    if (searchedText) {
      fetchRequestLogs()
    }
  }, [searchedText])

  useEffect(() => {
    if (requestLogs && requestLogs?.data && !requestLogs.data?.length) {
      setSelectedRequest((prev) => ({ ...prev, index: null, data: {} }))
    } else if (requestLogs && requestLogs?.data && requestLogs.data?.length) {
      generateFlowData(requestLogs?.data)
    }
  }, [requestLogs])

  const handleMenuItemClick = (index: number, data: any) => {
    setSelectedRequest((prev) => ({ ...prev, index, data }))
  }

  const downloadLogsToJson = async () => {
    const zip = new JSZip()
    for await (const [index, log] of Object.entries(requestLogDetails)) {
      const jsonDataBlob = new Blob([JSON.stringify(log.request)], { type: 'application/json' })
      let name = `${Number(index) + 1}_${String(log?.action)?.toLowerCase()}.json`
      if( String(log?.action)?.toLowerCase() === "on_status" ) {
        name = `${Number(index) + 1}_${String(log?.action)?.toLowerCase()}_${log.request?.message?.order?.fulfillments[0]?.state?.descriptor?.code}.json`
      }
      
      zip.file(name, jsonDataBlob)
    }

    const zipData = await zip.generateAsync({
      type: 'blob',
      streamFiles: true,
    })

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(zipData)
    link.download = `logs-${searchedText}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const submitData = async (data: any) => {
    setSearchedText(data.search)
  }

  const generateFlowData = (requestLogs: any) => {
    const nodes: any = []
    const edges: any = []
    let xIndex = 0

    let metaData = {
      bap_id: '',
      bap_uri: '',
      bpp_id: '',
      bpp_uri: '',
    }

    requestLogs.forEach((logs: any) => {
      if (!String(logs.action).includes('ON_')) {
        nodes.push({
          id: logs.id.toString(),
          position: { x: xIndex * 250, y: 120 },
          data: { label: logs.action, json: logs },
          type: 'customNode',
        })
        xIndex++
      } else {
        nodes.push({
          id: logs.id.toString(),
          position: { x: (xIndex - 1) * 250, y: 300 },
          data: { label: logs.action, json: logs },
          type: 'customNode',
        })
      }

      if (logs?.request?.context?.bap_id?.length) {
        metaData = { ...metaData, bap_id: logs?.request?.context?.bap_id }
      }

      if (logs?.request?.context?.bap_uri?.length) {
        metaData = { ...metaData, bap_uri: logs?.request?.context?.bap_uri }
      }

      if (logs?.request?.context?.bpp_id?.length) {
        metaData = { ...metaData, bpp_id: logs?.request?.context?.bpp_id }
      }

      if (logs?.request?.context?.bpp_uri?.length) {
        metaData = { ...metaData, bpp_uri: logs?.request?.context?.bpp_uri }
      }
    })

    for (let index = 0; index < requestLogs.length - 1; index++) {
      const currentId = requestLogs[index]
      const nextId = requestLogs[index + 1]

      if (String(nextId.action).includes('ON_')) {
        edges.push({
          id: `${currentId?.id.toString()}-${nextId?.id.toString()}`,
          source: currentId?.id.toString(),
          target: nextId?.id.toString(),
          markerEnd: {
            type: MarkerType.Arrow,
            width: 15,
            height: 15,
            color: '#1C75BC',
          },
          style: {
            strokeWidth: 2,
            stroke: '#1C75BC',
            strokeDasharray: 5,
          },
        })
      } else if (String(currentId.action).includes('ON_')) {
        edges.push({
          id: `${currentId?.id.toString()}-${nextId?.id.toString()}`,
          source: currentId?.id.toString(),
          target: nextId?.id.toString(),
          markerEnd: {
            type: MarkerType.Arrow,
            width: 15,
            height: 15,
            color: '#1C75BC',
          },
          style: {
            strokeWidth: 2,
            stroke: '#1C75BC',
          },
        })
      }
    }

    nodes.push({
      id: '000',
      position: { x: 0, y: 0 },
      data: {
        label: 'Buyer App Node',
        metaData: { bap_id: metaData.bap_id, bap_uri: metaData.bap_uri, width: xIndex * 250 },
      },
      type: 'customNode',
    })

    nodes.push({
      id: '001',
      position: { x: 0, y: 380 },
      data: {
        label: 'Seller App Node',
        metaData: { bpp_id: metaData.bpp_id, bap_uri: metaData.bpp_uri, width: xIndex * 250 },
      },
      type: 'customNode',
    })

    setNodes(nodes)
    setEdges(edges)
  }

  return (
    <MainWrapper>
      {/* Title  */}
      <HeadingWrapper>
        <Container>
          <MainHeading>Request Logs</MainHeading>
        </Container>
      </HeadingWrapper>

      {/* Search  */}
      <InformationWrapper>
        <ActivityWrapper>
          <SearchWrapper onSubmit={handleSubmit(submitData)}>
            <InputWrapper>
              <TextInput
                placeholder={'Enter Transaction Id'}
                prefix={<SearchIcon />}
                control={control}
                value={searchedText}
                name={'search'}
              />
            </InputWrapper>
            <ButtonWrapper>
              <Button type="submit" label="Search" variant="outline" />
              <Button
                type="button"
                variant={!requestLogDetails.length ? 'disabled' : 'outline'}
                label="Download"
                onClick={downloadLogsToJson}
              >
                <DownloadIcon />
              </Button>
            </ButtonWrapper>
          </SearchWrapper>
          {/* Records */}
          <RecordsWrapper>
            <LeftRecordsWrapper>
              <RecordLabel>Action Name</RecordLabel>
              {requestLogDetails.length ? (
                <MenuItemWrapper>
                  {requestLogDetails.map((log, i) => (
                    <MenuItem
                      key={i}
                      onClick={() => handleMenuItemClick(i, log)}
                      style={{ background: selectedRequest.index === i ? '#a1d3f88a' : '' }}
                    >
                      {log?.action}
                    </MenuItem>
                  ))}
                </MenuItemWrapper>
              ) : (
                <EmptyMenuItem>No Data Found</EmptyMenuItem>
              )}
            </LeftRecordsWrapper>
            <RightRecordsWrapper>
              {/* <ReactJson style={{ height: '100%', overflow: 'auto' }} name={false} src={selectedRequest.data} /> */}
              <CodeMirrorWrapper>
                {/* <CodeMirror
                  value={JSON.stringify(selectedRequest?.data?.request, null, 2)}
                  autoCursor={false}
                  options={{
                    readOnly: 'nocursor',
                    theme: 'material',
                    height: 'auto',
                    viewportMargin: Infinity,
                    mode: {
                      name: 'javascript',
                      json: true,
                      statementIndent: 2,
                    },
                    lineNumbers: true,
                    indentWithTabs: false,
                    tabSize: 2,
                  }}
                /> */}
                <ReactJson displayDataTypes={false} name={false} theme="monokai" src={selectedRequest?.data?.request} />
              </CodeMirrorWrapper>
            </RightRecordsWrapper>
          </RecordsWrapper>

          <div style={{ width: '100%', height: '500px' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
            >
              <Background color="#ccc" variant={BackgroundVariant.Dots} />
            </ReactFlow>
          </div>
        </ActivityWrapper>
      </InformationWrapper>
    </MainWrapper>
  )
}

export default RequestLogDetail
