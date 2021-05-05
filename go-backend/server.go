package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/micke", getRequestMicke)

    fmt.Printf("Starting server at port 8080\n")

	if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}

func getRequestMicke(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path != "/micke" {
        http.Error(w, "404 not found.", http.StatusNotFound)
        return
    }

    if r.Method != "GET" {
        http.Error(w, "Method is not supported.", http.StatusNotFound)
        return
    }


    fmt.Fprintf(w, "Hello Handsome!")
}