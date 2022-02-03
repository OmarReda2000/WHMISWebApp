// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import DevicesLayout from 'src/layouts/DevicesLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DevicesLayout}>
        <Route path="/devices/new" page={DeviceNewDevicePage} name="newDevice" />
        <Route path="/devices/{id:Int}/edit" page={DeviceEditDevicePage} name="editDevice" />
        <Route path="/devices/{id:Int}" page={DeviceDevicePage} name="device" />
        <Route path="/devices" page={DeviceDevicesPage} name="devices" />
      </Set>
      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/device-details/{id:Int}" page={DeviceDetailsPage} name="deviceDetails" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
