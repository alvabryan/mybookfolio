import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// ngrx store
import * as fromPortfolio from '../../store/index';
import * as PortfolioActions from '../../store/portfolio.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  @Input() coureWorkEditorData: any;

  courseWorkEditor: FormGroup;

  editorStyle = {
    height: '150px'
  };

  // editor options
  editorOptions = {
    toolbar: [
      // toggled buttons
      ['bold', 'italic', 'underline', 'strike'],
      // custom button values
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered'}, { list: 'bullet' }],
      // superscript/subscript
      [{ script: 'sub'}, { script: 'super' }],
      // headings
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // remove formatting button
      ['clean'],
      // link and image, video
      ['link']
    ]
  };

  constructor(private store: Store<fromPortfolio.State>) { }

  ngOnInit() {
    this.courseWorkEditor = new FormGroup({
      editor: new FormControl('')
    });

    this.store.select('portfolio').subscribe((data: any) => {
      if (data.viewData) {
        const letLevel = 'let' + data.cadetSearchData.letLevel;
        if (data.viewData[letLevel]) {
          if (data.viewData[letLevel].writtenContent) {
            const editorData = data.viewData[letLevel].writtenContent.content ? data.viewData[letLevel].writtenContent.content : null;
            this.courseWorkEditor.setValue({
              editor: editorData
            });
          } else {
            this.courseWorkEditor.setValue({
              editor: null
            });
          }
        } else {
          this.courseWorkEditor.setValue({
            editor: null
          });
        }

      }
    });
  }

  onSubmit() {
    const editorValue = this.courseWorkEditor.value;
    this.store.dispatch(PortfolioActions.fileUploadEditorUpdate({editorText: editorValue}));
  }

}
