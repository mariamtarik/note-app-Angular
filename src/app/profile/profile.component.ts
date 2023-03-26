import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  closeModal: string='';
AllNotes: any;
token:any;
decoded:any;
isLoad:boolean=false;
  constructor(private _Router:Router ,private _NotesService:NotesService) {
   try {
    this.token= localStorage.getItem("token");
    this.decoded = jwt_decode(this.token);
   } catch (error) {
     localStorage.clear();
     this._Router.navigate(['/signin']);
   }
   
   
    this.getAllNotes();

  let data={
    token:this.token,
    userID:this.decoded._id
  }
    this._NotesService.getAllNotes(data).subscribe(res=>{
console.log(res);
this.AllNotes=res.Notes;
    })
    

if(!localStorage.getItem("token")){
  this._Router.navigate(['/signin'])
}

  }

AddNote=new FormGroup({
title:new FormControl(null,[Validators.required]),
desc:new FormControl(null,[Validators.required]),

})
editForm=new FormGroup({
  title:new FormControl(null,[Validators.required]),
  desc:new FormControl(null,[Validators.required]),
  
  })
//to get all notes
getAllNotes(){
  let data={
    token:this.token,
    userID:this.decoded._id
  }
this._NotesService.getAllNotes(data).subscribe(res=>{
console.log(res);
if(res.message=='success' || res.message=="no notes found"){
  this.isLoad=true;
  this.AllNotes=res.Notes;
}
else{
  localStorage.clear();
  this._Router.navigate(["/signin"])
}

    })
}
//to add new note
addData(){
  let data={
    title:this.AddNote.value.title,
    desc:this.AddNote.value.desc,
    token:this.token,
    citizenID:this.decoded._id
  }
  this._NotesService.addNote(data).subscribe(res=>{
 $('#addNote').modal('hide');
 this.getAllNotes();
 this.AddNote.reset();
  })
}
  //to delete note
  NOTE_ID:any
  getID(id:any){
this.NOTE_ID=id
console.log(id);

}
deleteNote(){
  let data={
   token :this.token,
   NoteID:this.NOTE_ID
  }
  this._NotesService.deleteNote(data).subscribe(res=>{
    console.log(res);
    if(res.message=='deleted'){
      $('#deleteModal').modal('hide');
      this.getAllNotes();
    }
  })
}
  //to edit note
  SetValue(){
    for (let index = 0; index < this.AllNotes.length; index++) {
 if(this.AllNotes[index]._id==this.NOTE_ID){
  //  console.log(this.AllNotes[index]);
  this.editForm.controls.title.setValue(this.AllNotes[index].title);
  this.editForm.controls.desc.setValue(this.AllNotes[index].desc);
 }
      
 
  }
}
  editNote(){
    let data={
      title:this.editForm.value.title,
      desc:this.editForm.value.desc,
      NoteID:this.NOTE_ID,
      token:this.token
    }
this._NotesService.updateNote(data).subscribe(res=>{
  console.log(res);
  if(res.message=="updated"){
    $('#editModal').modal('hide');
    this.getAllNotes();
   
  }
})

}
 colorbox(){
$("#toggleIcon").click(function(){
  let colorBoxWidth=$('#colorBox').innerWidth();
  if($("#sideBar").css("left")=='0px'){
    $("#sideBar").animate({left:`-${colorBoxWidth}`},1000)
  }else{
    $("#sideBar").animate({left:`0px`},1000)
  }
})
let colorsCircles= $(".color-box");
colorsCircles.eq(0).css("backgroundColor","#CD5C5C");
colorsCircles.eq(1).css("backgroundColor","#C71585");
colorsCircles.eq(1).css("backgroundColor","#BDB76B");
colorsCircles.eq(2).css("backgroundColor","#FF00FF");
colorsCircles.eq(3).css("backgroundColor","#20B2AA");
colorsCircles.eq(4).css("backgroundColor","#87CEEB");
colorsCircles.eq(5).css("backgroundColor","#F5DEB3");
colorsCircles.eq(6).css("backgroundColor","#FAEBD7");
colorsCircles.eq(7).css("backgroundColor","Aquamarine");
colorsCircles.eq(8).css("backgroundColor","Lavender");
colorsCircles.eq(9).css("backgroundColor","LightSteelBlue");
colorsCircles.eq(10).css("backgroundColor","Tomato");
colorsCircles.eq(11).css("backgroundColor","#cff");
colorsCircles.click(function(e:any){
  let mycolor=$(e.target).css("backgroundColor");
  $(".note").css("backgroundColor",mycolor);
  $(".colors").css("color",mycolor);
})
 }


  ngOnInit(): void {
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
    this.colorbox()
  }

}
