import { FC } from 'react'

import { clsx } from 'clsx'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import Select, { ActionMeta, SingleValue, StylesConfig } from 'react-select'

import s from './pagination.module.scss'
import { usePagination } from './usePagination'

type PaginationConditionals =
  | {
      perPage?: null
      perPageOptions?: never
      onPerPageChange?: never
    }
  | {
      perPage?: number
      perPageOptions: number[]
      onPerPageChange: (newValue: SingleValue<number>, actionMeta: ActionMeta<number>) => void
    }

export type PaginationProps = {
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number
  perPageOptions?: number[]
  onPerPageChange?: (newValue: SingleValue<number>, actionMeta: ActionMeta<number>) => void
} & PaginationConditionals

const classNames = {
  root: s.root,
  container: s.container,
  selectBox: s.selectBox,
  select: s.select,
  item: s.item,
  dots: s.dots,
  icon: s.icon,
  pageButton(selected?: boolean) {
    return clsx(this.item, selected && s.selected)
  },
}

export const Pagination: FC<PaginationProps> = ({
  onChange,
  count,
  page,
  perPage = null,
  perPageOptions,
  onPerPageChange,
  siblings,
}) => {
  const {
    paginationRange,
    isLastPage,
    isFirstPage,
    handlePreviousPageClicked,
    handleNextPageClicked,
    handleMainPageClicked,
  } = usePagination({
    page,
    count,
    onChange,
    siblings,
  })

  const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange

  const onNext = () => {
    handleNextPageClicked()
  }

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />

        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />

        <NextButton onClick={onNext} disabled={isLastPage} />
      </div>

      {showPerPageSelect && (
        <PerPageSelect
          {...{
            perPage,
            perPageOptions,
            onPerPageChange,
          }}
        />
      )}
    </div>
  )
}

type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}

type PageButtonProps = NavigationButtonProps & {
  page: number
  selected: boolean
}

const Dots: FC = () => {
  return <span className={s.dots}>&#8230;</span>
}
const PageButton: FC<PageButtonProps> = ({ onClick, disabled, selected, page }) => {
  const onChangeHandler = () => {
    onClick()
  }

  return (
    <button
      onClick={onChangeHandler}
      disabled={selected || disabled}
      className={classNames.pageButton(selected)}
    >
      {page}
    </button>
  )
}
const PrevButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      <BiChevronLeft className={s.icon} size={16} />
    </button>
  )
}

const NextButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      <BiChevronRight className={s.icon} size={16} />
    </button>
  )
}

type MainPaginationButtonsProps = {
  paginationRange: (number | string)[]
  currentPage: number
  onClick: (pageNumber: number) => void
}

const MainPaginationButtons: FC<MainPaginationButtonsProps> = ({
  paginationRange,
  currentPage,
  onClick,
}) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const selected = +page === currentPage

        const onChangeHandler = () => {
          if (typeof page !== 'string') {
            onClick(page)
          }
        }

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return <PageButton key={index} page={page} selected={selected} onClick={onChangeHandler} />
      })}
    </>
  )
}

export type PerPageSelectProps = {
  perPage?: number
  perPageOptions: number[]
  onPerPageChange?: (newValue: any, value: ActionMeta<number>) => void
}

export const PerPageSelect: FC<PerPageSelectProps> = ({ perPageOptions, onPerPageChange }) => {
  const selectOptions = perPageOptions.map(value => ({
    value: [value],
    label: value,
  }))

  const colourStyles: StylesConfig<any> = {
    control: styles => ({
      ...styles,
      backgroundColor: '#333',
      minHeight: 24,
      width: 50,
      boxShadow: 'none',
      paddingLeft: 4,
      fontSize: 14,
    }),
    container: styles => ({ ...styles, width: 50 }),
    indicatorsContainer: styles => ({
      ...styles,
      '&:hover': {
        color: 'red',
      },
      position: 'absolute',
      right: -8,
      top: -2,
      padding: 0,
      color: '#fff',
    }),
    menuList: styles => ({
      ...styles,
      '&:hover': {
        backgroundColor: '#333',
      },
      backgroundColor: '#333',
      // overflow: 'hidden',
      textAlign: 'center',
      color: 'white',
    }),
    valueContainer: styles => ({ ...styles, padding: 0 }),
    singleValue: styles => ({ ...styles, color: 'white' }),

    option: styles => ({
      ...styles,
      '&:hover': {
        backgroundColor: '#382766',
        color: 'white',
      },
      backgroundColor: '#333',
      color: 'white',
      fontSize: 14,
    }),
    input: styles => ({
      ...styles,
      color: 'white',
    }),
  }

  // const [selectedOption, setSelectedOption] = useState(0)

  // const handleChange = (selectedOption: any) => {
  //   setSelectedOption(selectedOption)
  // }

  return (
    <div className={s.selectBox}>
      Показать
      <Select
        //value={selectedOption}
        styles={colourStyles}
        options={selectOptions}
        onChange={onPerPageChange}
        placeholder={selectOptions[0].label}
        // onChange={onPerPageChange}
        //options={options}
        // menuPortalTarget={document.body}
      />
      на странице
    </div>
  )
}
