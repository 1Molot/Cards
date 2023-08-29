import { FC } from 'react'

import { ArrowDown } from '../../assets/icons/arrowDown.tsx'
import { ArrowUp } from '../../assets/icons/arrowUp.tsx'
import { Sort, TableElement } from '../../shared/ui'

import { Column } from './descks-table.tsx'

type PropsType = {
  columns: Column[]
  sort?: Sort
  onSort?: (sort: Sort | null) => void
}

export const HeaderTable: FC<PropsType> = ({ columns, sort, onSort }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) {
      onSort({ key, direction: 'asc' })

      return
    }

    if (sort.direction === 'desc') {
      onSort(null)

      return
    }

    onSort({ key, direction: sort.direction === 'asc' ? 'desc' : 'asc' })
  }

  return (
    <TableElement.Head>
      <TableElement.Row>
        {columns.map(({ title, sortable, key }) => (
          <TableElement.HeadCell key={key} onClick={handleSort(key, sortable)}>
            {title}
            {sort?.key === key && (
              <span>{sort.direction === 'asc' ? <ArrowDown /> : <ArrowUp />}</span>
            )}
          </TableElement.HeadCell>
        ))}
      </TableElement.Row>
    </TableElement.Head>
  )
}
