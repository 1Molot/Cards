import { Button, Table, TabSwitcher, TextField, Typography } from '../../shared/lib'

export const Decks = () => {
  // const tabSwitcherOptions = useAppSelector<RootState>(state => state.decksSlice.tabSwitcherOptions)
  // const [activeTab, setActiveTab] = useState(tabSwitcherOptions[1].value)

  return (
    <>
      <div>
        <div style={{ marginBottom: '36px', marginTop: '36px' }}>
          <Button variant={'primary'}>Add New Pack</Button>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '300px' }}>
            <TextField placeholder={'Input search'} type={'searchType'} />
          </div>
          <div>
            <Typography></Typography>
            <TabSwitcher
            // onChangeCallback={value => handleTabSort(value)}
            // options={tabSwitcherOptions}
            // className={s.switcher}
            // activeTab={activeTab}
            //     activeTab={[{ id: 1, value: 'My Cards' },{ id: 2, value: 'All Cards' }]}
            />
          </div>
        </div>
      </div>
      <Table />
    </>
  )
}
