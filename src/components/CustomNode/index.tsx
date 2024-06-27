import CloseIcon from 'assets/svg/CloseIcon'
import Modal from 'components/Modal'
import { FC, useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { HeadingWrapper } from 'styles/views/dashboard'
// import { UnControlled as CodeMirror } from 'react-codemirror2'
import ReactJson from 'react-json-view'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript.js'
import 'reactflow/dist/style.css'
import { ContentWrapper, Label, ModalBody, ModalHeader, ModalWrapper, NodeWrapper } from 'styles/components/CustomNode'

const defaultJSon = {
  action: '',
  request: {},
}

const CustomNode: FC<NodeProps> = ({ data }) => {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    json: defaultJSon,
  })
  const metaData = data?.metaData

  return (
    <>
      <NodeWrapper
        style={{
          minWidth: metaData ? '900px' : '100px',
        }}
        onClick={() => !metaData && setModalInfo((prev) => ({ ...prev, isOpen: true, json: data.json }))}
      >
        <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
        <ContentWrapper>
          <Label>{data?.label}</Label>

          {metaData &&
            Object.keys(metaData).map((key, i) => {
              return (
                <div key={i} style={{ color: '#666' }}>
                  {metaData[key]}
                </div>
              )
            })}
        </ContentWrapper>
        <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      </NodeWrapper>

      <Modal isOpen={modalInfo.isOpen}>
        <ModalWrapper>
          <ModalHeader>
            <HeadingWrapper>{modalInfo.json.action}</HeadingWrapper>
            <CloseIcon
              style={{ cursor: 'pointer' }}
              onClick={() => setModalInfo({ isOpen: false, json: defaultJSon })}
            />
          </ModalHeader>
          <ModalBody>
            {/* <CodeMirror
              value={JSON.stringify(modalInfo.json?.request, null, 2)}
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
            <ReactJson displayDataTypes={false} name={false} theme="monokai" src={modalInfo.json?.request} />
          </ModalBody>
        </ModalWrapper>
      </Modal>
    </>
  )
}

export default CustomNode
