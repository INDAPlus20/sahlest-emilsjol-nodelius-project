package main

import "time"
 
type Message struct {
    Author      string    `json:"author"`
    Text        string     `json:"text"`
    List        []string     `json:"list"`
    Sent       time.Time `json:"sent"`
}
 
type Messages []Message