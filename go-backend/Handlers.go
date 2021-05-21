package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"

	"github.com/gorilla/mux"
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
		Message{Author: "Mikael", Text: "Hey Handsome, how are you doin?", List: []string{"test", "test2"}},
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

func HandleAudio(w http.ResponseWriter, r *http.Request) {
	r.Header.Set("Access-Control-Allow-Origin", "*")
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()

	data := []float64{}
	for _, v := range body {
		data = append(data, float64(v))
	}
	PSD := powerSpectrum(fft(data))

	audio := AudioData{List: PSD[0 : len(PSD)/2]}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(audio); err != nil {
		panic(err)
	}

}

func ChatBot(w http.ResponseWriter, r *http.Request) {

	r.Header.Set("Access-Control-Allow-Origin", "*")
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()

	rovar := toRovarsprak(string(body))

	data := StringData{Text: rovar}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(data); err != nil {
		panic(err)
	}
}
