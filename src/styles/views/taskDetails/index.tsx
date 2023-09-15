import styled from 'styled-components'
import { theme } from 'styles/theme'

export const TaskDetailsContainer = styled.div`
  width: 100%;
  max-width: 1084px;
  background: #ffffff;
  padding: 30px 18px;
  border-radius: 16px;
`
export const TaskDetailContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #ffffff;
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  max-height: 71vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  gap: 28px;
`
export const TaskHeading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const TaskDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const SelectDriversContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: ${theme.LIGHTBLUECOLOR};
  width: 100%;
  max-width: 363px;
  padding: 16px;
  border-radius: 12px;
`
export const DriverHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const DriverSubheading = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`
export const DriverCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  max-height: 516px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const DriverInfoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`
export const DriverCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #ffffff;
  padding: 15px;
  border-radius: 12px;
`
export const DriverInfoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #ffffff;
  padding: 15px 0;
  border-bottom: 1px solid #e8e8e8;
`

export const DriverInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const DriverInformaition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const DriverInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
export const ImageWrap = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid ${theme.YELLOW};
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
`
export const NameWrap = styled.div`
  .mobile {
    font-size: 12px;
    line-height: 16px;
    color: ${theme.GREYCOLOR};
    margin-top: 5px;
  }
`
export const DriverName = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.DARKBLACKCOLOR};
  text-align: start;
`
export const TaskInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`
export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`
export const TaskLabel = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 10px;
  line-height: 18px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const TaskNumber = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: ${theme.GREYCOLOR};
`
