import React from 'react'

const NavContext = React.createContext({
  isShowMenu: false,
  onChangeMenu: () => {},
})

export default NavContext
