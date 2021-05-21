package main

import "strings"

func toRovarsprak(userInput string) string {
	cons := "bcdfghjklmnpqrstvwxz"
	userInput = strings.ToLower(userInput)

	final := ""
	for _, item := range userInput {
		value := string(item)
		if strings.Contains(cons, value) {
			final = final + value + "o" + value
		} else {
			final = final + value
		}
	}

	return final
}
