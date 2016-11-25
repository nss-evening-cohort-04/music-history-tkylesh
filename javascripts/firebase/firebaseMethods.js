"use strict";
var FbAPI = (function(oldFirebase){

  oldFirebase.getTodos = function(apiKeys, uid){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url:`${apiKeys.databaseURL}/songs.json`
      }).then((response)=>{
        //turn the object response into an array with this code
        let songs = [];
        Object.keys(response).forEach(function(key){
          response[key].id = key;
          songs.push(response[key]);
        });
        resolve(songs);
      }, (error)=>{
        reject(error);
      });
    });
  };
  oldFirebase.addTodo = function(apiKeys, newItem){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        url:`${apiKeys.databaseURL}/songs.json`,
        data: JSON.stringify(newItem),
        dataType: 'json'
      }).then((response)=>{
        console.log("response from post: ",response);
        resolve(response);
      }, (error)=>{
        reject(error);
      });
    });
  };
  oldFirebase.deleteTodo = function(apiKeys, itemId){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'DELETE',
        url:`${apiKeys.databaseURL}/songs/${itemId}.json`,
      }).then((response)=>{
        console.log("response from delete: ",response);
        resolve(response);
      }, (error)=>{
        reject(error);
      });
    });
  };

  oldFirebase.editTodo = function(apiKeys, itemId, editedItem){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        url:`${apiKeys.databaseURL}/songs/${itemId}.json`,
        data: JSON.stringify(editedItem),
        dataType: 'json'
      }).then((response)=>{
        console.log("response from post: ",response);
        resolve(response);
      }, (error)=>{
        reject(error);
      });
    });
  };

  return oldFirebase;
})(FbAPI || {});