import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class EditText extends React.Component {
    state = {
        contenido: ''
    }
  handleEditorChange = (e) => {
    console.log(
      'Content was updated:',
      e.target.getContent()
    );
    this.setState({
       contenido: e.target.getContent()
    })
    let contenido = document.getElementById('contenido');
    contenido.innerHTML=`${this.state.contenido}`
  }
  saveContent = () => {
      console.log(this.state.contenido);
        let contenido =  document.getElementById('contenido');
        contenido.innerHTML=`${this.state.contenido}`    
  }
  render() {
    return (
        <div className="row w-100">
            <div className="col-md-6 p-4">
                <Editor
                    initialValue="<p>Wow ! ... It Works !!!</p>"
                    init={{
                    selector: '#editor',
                    height: 500,
                    menubar: false,
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.onchange = function () {
                        var file = this.files[0];
                    
                        var reader = new FileReader();
                        reader.onload = function () {
                            var id = 'blobid' + (new Date()).getTime();
                            // eslint-disable-next-line no-undef
                            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                            var base64 = reader.result.split(',')[1];
                            var blobInfo = blobCache.create(id, file, base64);
                            cb(blobInfo.blobUri(), { title: file.name });
                        };
                        reader.readAsDataURL(file);
                        };
                    
                        input.click();
                    },
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount',
                        'image code'
                    ],
                    toolbar:
                        `undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent|undo redo | link image | code | hel`
                    }}
                    onChange={this.handleEditorChange}
                />
                <div className="form-group">
                    <button className="btn btn-primary" onClick={() => this.saveContent()}>
                        guardar
                    </button>
                </div>
            </div>
            <div className="col-md-6 p-4">
                <h5 className="text-primary"><strong>Vista previa</strong></h5>
                <hr/>
                <div id="contenido">

                </div>
            </div>

        </div>
    );
  }
}

export default EditText;