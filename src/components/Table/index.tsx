import { Table } from 'antd'

type ScrollOptions = {
  offsetHeader?: number
  offsetScroll?: number
  getContainer?: () => HTMLElement
}

const TableSection = (props: any) => {
  const scrollOptions: ScrollOptions = {
    offsetHeader: 618, // Example offset value for the sticky header
    offsetScroll: 200, // Example offset value for triggering scroll changes
  }
  return (
    <div>
      <Table {...props} scroll={scrollOptions} />
    </div>
  )
}

export default TableSection
