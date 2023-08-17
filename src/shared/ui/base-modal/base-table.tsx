import { FC, ReactNode } from 'react'

import { Table, TableBody, TableHead, TableHeadCell, TableRow } from '../../lib'

type BaseTableType = {
  headerItems: { id: number; title: string }[]
  children: ReactNode
}
export const BaseTable: FC<BaseTableType> = ({ headerItems, children }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headerItems.map(hI => (
            <TableHeadCell key={hI.id}>{hI.title}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  )
}
