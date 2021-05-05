package main

import "time"
 
type Message struct {
    Author      string    `json:"author"`
    Text        string     `json:"text"`
    Sent       time.Time `json:"sent"`
}
 
type Messages []Message