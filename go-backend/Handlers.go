package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)
 
func Index(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Welcome to Mikaels cool API!")
}
 
func MessageList(w http.ResponseWriter, r *http.Request) {
    messages := Messages{
        Message{Author: "Mikael", Text: "Hey Handsome, how are you doin?"},
        Message{Author: "Emil", Text: "Doing fine!"},
    }

    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.WriteHeader(http.StatusOK)
 
    if err := json.NewEncoder(w).Encode(messages); err != nil {
        panic(err)
    }
}
 
// Not implemented....
func ShowMessages(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    messageId := vars["messageId"]
    fmt.Fprintln(w, "Show Messages:", messageId)
}

