import styled from 'styled-components'

export const NodeWrapper = styled.div`
  padding: 8px 20px;
  border: 1px solid #666;
  border-radius: 4px;
`

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: Inter;
  font-size: 12px;
  line-height: 18px;
`

export const Label = styled.div`
  color: #333;
  font-weight: 600;
`

export const ModalWrapper = styled.div`
  height: 500px;
  width: 700px;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: cenetr;
  padding: 24px;
  border-bottom: 1px solid #999;
`

export const ModalBody = styled.div`
  height: calc(100% - 114px);
  padding: 24px;
  overflow:auto;

  .react-codemirror2 {
    height: 100%;
  }

  .CodeMirror {
    height: 100%;
  }
`
