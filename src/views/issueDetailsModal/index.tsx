import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import PdfImage from 'assets/images/pdf.png'
import ExcelImage from 'assets/images/excel.png'
import DownloadIcon from 'assets/svg/DownloadIcon'
import { IModalProps } from 'interfaces/views'
import { ModalContainer, AddContentContainer, HeadingContainer, HeadingWrapper } from 'styles/views/successfulModal'
import {
  IssueDetailWrapper,
  IssueWrapper,
  Title,
  OrderDesc,
  DescriptionTitle,
  IssueDesc,
  DocumentTitle,
  DocumentDesc,
  DownloadWrapper,
  Documentwrapper,
  ImageWrap,
  Download,
  DocumentLinkWrapper,
  DocumentCotainer,
  CopyLink,
} from 'styles/views/issueDetailsModal'

const IssueDetailsModal = ({ showModal }: IModalProps) => (
  <ModalContainer>
    <AddContentContainer>
      <HeadingContainer>
        <HeadingWrapper>Issue Details</HeadingWrapper>
        <CloseIcon onClick={() => showModal(false)} />
      </HeadingContainer>
      <IssueDetailWrapper>
        <IssueWrapper>
          <Title>Order Number</Title>
          <OrderDesc>#92828212NSH3</OrderDesc>
        </IssueWrapper>
        <IssueWrapper>
          <Title>Issue Title</Title>
          <OrderDesc>Damaged and not good Product</OrderDesc>
        </IssueWrapper>
        <IssueWrapper>
          <DescriptionTitle>Issue Description</DescriptionTitle>
          <IssueDesc>Concise summary of the problem or concern.</IssueDesc>
        </IssueWrapper>
        <DocumentCotainer>
          <IssueWrapper>
            <DocumentTitle>Issue Document</DocumentTitle>
            <DocumentDesc>Comprehensive documentation detailing the reported issue</DocumentDesc>
          </IssueWrapper>
          <DownloadWrapper>
            <Documentwrapper>
              <ImageWrap>
                <img src={PdfImage} alt="PdfImage" />
              </ImageWrap>
              <ImageWrap>
                <img src={ExcelImage} alt="ExcelImage" />
              </ImageWrap>
            </Documentwrapper>
            <Download>
              <Button label="Download" variant="outline" className="download">
                <DownloadIcon />
              </Button>
            </Download>
          </DownloadWrapper>
        </DocumentCotainer>

        <IssueWrapper>
          <DescriptionTitle>Document Link*</DescriptionTitle>
          <DocumentLinkWrapper>
            <a href="#">https://drive.google.com/drive/folders/13roJOTZu3gor_LT_5fM...</a>
            <CopyLink>Copy Link</CopyLink>
          </DocumentLinkWrapper>
        </IssueWrapper>
      </IssueDetailWrapper>
    </AddContentContainer>
  </ModalContainer>
)

export default IssueDetailsModal
