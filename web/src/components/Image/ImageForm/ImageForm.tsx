import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

// const formatDatetime = (value) => {
//   if (value) {
//     return value.replace(/:\d{2}\.\d{3}\w/, '')
//   }
// }

const ImageForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.image?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="data"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Data
        </Label>
        <TextField
          name="data"
          defaultValue={props.image?.data}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="data" className="rw-field-error" />

        <Label
          name="deviceId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Device id
        </Label>
        <TextField
          name="deviceId"
          defaultValue={props.image?.deviceId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="deviceId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ImageForm
