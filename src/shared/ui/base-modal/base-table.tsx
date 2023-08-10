import { FC, ReactNode } from 'react'

import { Table, TableBody, TableHead, TableHeadCell, TableRow } from '../../lib/table'

type BaseTableType = {
  headerItems: { id: number; title: string }[]
  children: ReactNode
  // item: string
}
export const BaseTable: FC<BaseTableType> = ({ headerItems, children }) => {
  return (
    <Table>
      {/* table-fake*/}
      <TableHead>
        {/* thead*/}
        <TableRow>
          {headerItems.map(hI => (
            <TableHeadCell key={hI.id}>{hI.title}</TableHeadCell>
          ))}
          {/*/!* tr*!/*/}
          {/*<TableHeadCell>Name</TableHeadCell>*/}
          {/*/!* th*!/*/}
          {/*<TableHeadCell>Cards</TableHeadCell>*/}
          {/*<TableHeadCell>Last Updated</TableHeadCell>*/}
          {/*<TableHeadCell>Created By</TableHeadCell>*/}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* tbody*/}
        {children}
      </TableBody>
    </Table>
  )
}
