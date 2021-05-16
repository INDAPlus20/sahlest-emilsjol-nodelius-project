package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
    "math/rand"
)
 
func Index(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Welcome to Mikaels cool API!")
}

func Matrix(w http.ResponseWriter, r *http.Request) {
    mtrx := [100][100]float32{}
    n := len(mtrx)
    m := len(mtrx[0])
    for i := 0; i < n; i++ {
        for j := 0; j < m; j++ {
            mtrx[i][j] = rand.Float32()
        }
    }
    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.WriteHeader(http.StatusOK)
 
    if err := json.NewEncoder(w).Encode(mtrx); err != nil {
        panic(err)
    }
}
 
func MessageList(w http.ResponseWriter, r *http.Request) {
    messages := Messages{
        Message{Author: "Mikael", Text: "Hey Handsome, how are you doin?", List: []string{"test", "test2"} },
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

