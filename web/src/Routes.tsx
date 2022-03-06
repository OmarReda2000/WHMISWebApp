// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import ImagesLayout from 'src/layouts/ImagesLayout'
import DevicesLayout from 'src/layouts/DevicesLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ImagesLayout}>
        <Route path="/images/new" page={ImageNewImagePage} name="newImage" />
        <Route path="/images/{id:Int}/edit" page={ImageEditImagePage} name="editImage" />
        <Route path="/images/{id:Int}" page={ImageImagePage} name="image" />
        <Route path="/images" page={ImageImagesPage} name="images" />
      </Set>
      <Route path="/image" page={ImagePage} name="image" />
      <Set wrap={DevicesLayout}>
        <Route path="/devices/new" page={DeviceNewDevicePage} name="newDevice" />
        <Route path="/devices/{id:String}/edit" page={DeviceEditDevicePage} name="editDevice" />
        <Route path="/devices/{id:String}" page={DeviceDevicePage} name="device" />
        <Route path="/devices" page={DeviceDevicesPage} name="devices" />
      </Set>
      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/device-details/{id:String}" page={DeviceDetailsPage} name="deviceDetails" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
