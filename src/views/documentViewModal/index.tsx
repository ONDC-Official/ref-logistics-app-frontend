import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import {
  ModalContainer,
  DocumentContentContainer,
  HeadingWrapper,
  HeadingContainer,
  DocumentWrapper,
  ButtonWrapper,
  DocumentContainer,
  DocumentInnerWrapper,
  ImageWrapper,
} from 'styles/views/successfulModal'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export interface IOpenModalProps {
  filePath: string
  handlePreviewClose: any
}

const DocumentViewModal = ({ filePath, handlePreviewClose }: IOpenModalProps) => {
  const downloadDocument = (item: string) => {
    window.open(item)
  }

  const pdfFile = filePath?.substring(filePath?.lastIndexOf('.') + 1)

  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfData, setPdfData] = useState<Blob | null>(null)

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await fetch(filePath)
        const arrayBuffer = await response.arrayBuffer()
        const data = new Uint8Array(arrayBuffer)
        const blob = new Blob([data], { type: 'application/pdf' })
        setNumPages(0)
        setPageNumber(1)
        setPdfData(blob)
      } catch (error) {
        return error
      }
    }

    fetchPDF()
  }, [filePath])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  return (
    <ModalContainer>
      <DocumentContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Preview</HeadingWrapper>
          <CloseIcon onClick={handlePreviewClose} />
        </HeadingContainer>
        <DocumentWrapper>
          <DocumentContainer>
            {pdfData && pdfFile === 'pdf' ? (
              <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
                <DocumentInnerWrapper>
                  {Array.from(new Array(numPages), (_, index) => (
                    <Page
                      key={`page_${_ + 1}`}
                      pageNumber={index + 1}
                      className={`page ${pageNumber === index + 1 ? 'active' : ''}`}
                    />
                  ))}
                </DocumentInnerWrapper>
              </Document>
            ) : (
              <ImageWrapper src={filePath} />
            )}
          </DocumentContainer>
        </DocumentWrapper>
        <ButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" onClick={handlePreviewClose} />
          <Button label="Download" variant="contained" type="submit" onClick={() => downloadDocument(filePath)} />
        </ButtonWrapper>
      </DocumentContentContainer>
    </ModalContainer>
  )
}

export default DocumentViewModal
