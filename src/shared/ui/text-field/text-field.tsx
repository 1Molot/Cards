import { ChangeEvent, KeyboardEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Delete } from '../../../assets/icons/delete.tsx'
import { Eye } from '../../../assets/icons/eye.tsx'
import { NotEye } from '../../../assets/icons/not-eye.tsx'
import { Search } from '../../../assets/icons/search.tsx'
import { LabelDemo } from '../../lib/label'
import { Typography } from '../typography'

import s from './text-field.module.scss'

export type TextFieldProps = {
  type: 'default' | 'password' | 'searchType'
  label?: string
  errorMessage?: string
  placeholder?: string
  disableValue?: boolean
  value?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  onSearchClear?: () => void
  className?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      errorMessage,
      label,
      placeholder = 'Some text',
      type = 'default',
      disableValue = false,
      value,
      onEnter,
      onSearchClear,
      onChangeText,
      className,
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const finalType = getType(type, showPassword)

    const inputStyle = (type: 'default' | 'password' | 'searchType') => {
      if (type === 'searchType') {
        return { paddingLeft: '2.56rem', paddingRight: '35px' }
      } else if (type === 'password') {
        return { paddingRight: '35px' }
      } else {
        return {}
      }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeText?.(e.currentTarget.value)
    }

    const onKeyDownCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onEnter && e.key === 'Enter' && onEnter()
    }
    const onSearchClearHandler = () => {
      if (onSearchClear) {
        onSearchClear()
      }
    }

    return (
      <div className={className}>
        <LabelDemo label={label} variant={'secondary'}>
          <div className={`${s.fieldContainer}`}>
            {type === 'searchType' && (
              <span className={s.search}>
                <Search fill={disableValue ? '#4c4c4c' : '#808080'} />
              </span>
            )}
            <input
              className={`${s.field} ${errorMessage ? s.error : ''}`}
              placeholder={placeholder}
              type={finalType}
              disabled={disableValue}
              onChange={onChangeHandler}
              onKeyDown={onKeyDownCallback}
              style={inputStyle(type)}
              value={value}
              ref={ref}
              {...restProps}
            />
            {type === 'password' && (
              <button
                className={s.buttonAction}
                type={'button'}
                disabled={disableValue}
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <Eye fill={disableValue ? '#4c4c4c' : '#fff'} />
                ) : (
                  <NotEye fill={disableValue ? '#4c4c4c' : '#fff'} />
                )}
              </button>
            )}
            {type === 'searchType' && !!value && (
              <button
                className={s.buttonAction}
                type={'button'}
                disabled={disableValue}
                onClick={onSearchClearHandler}
              >
                <Delete fill={disableValue ? '#4c4c4c' : '#808080'} />
              </button>
            )}
          </div>
          <Typography variant="Body1" className={s.errorMessage}>
            {errorMessage}
          </Typography>
        </LabelDemo>
      </div>
    )
  }
)

function getType(type: string, showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
