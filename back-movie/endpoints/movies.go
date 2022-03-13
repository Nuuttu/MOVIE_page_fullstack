package endpoints

import (
	"fmt"
	"net/http"
)

/*
func Movies(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Movies sent")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")

	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movieList)
}
*/
func Test(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Test")
}
