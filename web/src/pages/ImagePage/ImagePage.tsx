import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ImagePage = () => {
  return (
    <>
      <MetaTags title="Image" description="Image page" />

      <h1>ImagePage</h1>
      <p>
        Find me in <code>./web/src/pages/ImagePage/ImagePage.tsx</code>
      </p>
      <p>
        My default route is named <code>image</code>, link to me with `
        <Link to={routes.image()}>Image</Link>`
      </p>
    </>
  )
}

export default ImagePage
