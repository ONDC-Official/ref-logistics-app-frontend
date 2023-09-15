import styled from 'styled-components'
import { theme } from 'styles/theme'

export const IssueDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 36px 24px;
`
export const IssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`
export const Title = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.GREYCOLOR};
`
export const OrderDesc = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const DescriptionTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.NEUTRALBLACKCOLOR};
`
export const IssueDesc = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.TITLECOLOR};
`
export const DocumentTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const DocumentDesc = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.GREYCOLOR};
`
export const DownloadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Documentwrapper = styled.div`
  display: flex;
  gap: 19px;
`
export const ImageWrap = styled.div``
export const Download = styled.div`
  .download {
    flex-direction: row-reverse;
    gap: 11px;
    width: 164px;
    height: 44px;
  }
`
export const CopyLink = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #419e6a;
  padding: 9px 14px;
  background: rgba(65, 158, 106, 0.17);
  border: 1.5px solid rgba(65, 158, 106, 0.71);
  border-radius: 5px;
`
export const DocumentLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #dff2ff;
  padding: 5px 6px 5px 9px;
  border: 1px solid #4aa1e0;
  border-radius: 8px;
  a {
    color: #4aa1e0;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
`
export const DocumentCotainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
`
