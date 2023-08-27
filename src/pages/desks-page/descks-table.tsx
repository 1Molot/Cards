import { Edit } from '../../assets/icons/edit.tsx'
import { Play } from '../../assets/icons/play.tsx'
import { Trash } from '../../assets/icons/trash.tsx'
import { DeckType } from '../../featchers'
import { Body, Cell, Head, HeadCell, Root, Row } from '../../shared/lib/table/table.tsx'

type TableProps = {
  data?: DeckType[]
}

export const DeskTable = ({ data }: TableProps) => {
  /*  const [sortTable, setSortTable] = useState(false)
        const changeSort = (status: boolean) => setSortTable(status)*/
  const dataHeader = [
    {
      id: 1,
      title: 'name',
    },
    {
      id: 2,
      title: 'Cards',
    },
    {
      id: 3,
      title: 'Last Updated',
    },
    {
      id: 4,
      title: 'Created',
    },
  ]

  return (
    <Root>
      <Head>
        <Row>
          {dataHeader.map(el => {
            return <HeadCell key={el.id}>{el.title}</HeadCell>
          })}
        </Row>
      </Head>
      <Body>
        {data?.map(el => {
          return (
            <Row key={el.id}>
              <Cell>{el.name}</Cell>
              <Cell>{el.updated}</Cell>
              <Cell>{el.created}</Cell>
              <Cell>
                <Play />
                <Edit />
                <Trash />
              </Cell>
            </Row>
          )
        })}
      </Body>
    </Root>
    /* <ModalDeletePack onClick={}/>*/
  )
}
