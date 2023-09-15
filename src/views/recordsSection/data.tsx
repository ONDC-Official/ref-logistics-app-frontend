import { ICardData } from 'interfaces'
import AgentIcon from 'assets/svg//AgentCountingIcon'
import IssuesIcon from 'assets/svg/IssuesIcon'
import OrderIcon from 'assets/svg/OrderIcon'

export const cardData: ICardData[] = [
  {
    id: 1,
    icon: <AgentIcon />,
    number: '05',
    description: 'Total Driver Added',
  },
  {
    id: 2,
    icon: <OrderIcon />,
    number: '19',
    description: 'Total Tasks Created',
  },
  {
    id: 3,
    icon: <IssuesIcon />,
    number: '02',
    description: 'Total Issues Created',
  },
]
