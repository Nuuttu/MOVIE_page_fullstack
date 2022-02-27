package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/darahayes/go-boom"
	"github.com/gorilla/mux"
	"github.com/rs/xid"
)

type Movie struct {
	Id       xid.ID    `json:"Id"`
	Name     string    `json:"Name"`
	Year     int       `json:"Year"`
	Rating   int       `json:"Rating"`
	Review   string    `json:"Review"`
	Watches  []Watch   `json:"Watches"`
	Comments []Comment `json:"Comments"`
}

type EditMovie struct {
	Name   string `json:"Name"`
	Year   int    `json:"Year"`
	Rating int    `json:"Rating"`
	Review string `json:"Review"`
}

type Watch struct {
	Date  time.Time `json:"Date"`
	Place string    `json:"Place"`
	Note  string    `json:"Note"`
}

type Comment struct {
	Id            int       `json:"Id"`
	Owner         string    `json:"Owner"`
	Content       string    `json:"Content"`
	Creation_Time time.Time `json:"Creation_Time"`
}

var movieList []Movie

func toLowerCase(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		r.URL.Path = strings.ToLower(r.URL.Path)
		h.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home")
}

func nothing(w http.ResponseWriter, r *http.Request) {
	boom.NotFound(w, "Sorry, there's nothing here.")
	// https://pkg.go.dev/github.com/darahayes/go-boom?utm_source=godoc
}

func movies(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Movies gotten")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")

	json.NewEncoder(w).Encode(movieList)
}

// ENDPOINT Lisää listan
func addMovie(w http.ResponseWriter, r *http.Request) {
	//w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, POST")

	if r.Method == "POST" {

		reqBody, _ := ioutil.ReadAll(r.Body)
		fmt.Println("reqBody ", string(reqBody))
		var newMovie Movie
		json.Unmarshal(reqBody, &newMovie)
		fmt.Printf("new Movie:\n{\n Name: %s,\n Year: %d\n Rating: %d\n Review: %s\n}\n", newMovie.Name, newMovie.Year, newMovie.Rating, newMovie.Review)
		newMovie.setId()
		var newWatch Watch
		json.Unmarshal(reqBody, &newWatch)
		if !newWatch.Date.IsZero() {
			newMovie.Watches = append(newMovie.Watches, newWatch)
		}
		fmt.Printf("new Movie details: \nName: %s \nReview: %s\nRating: %d\nDate: %s\nPlace: %s\nNote: %s\n ", newMovie.Name, newMovie.Review, newMovie.Rating, newWatch.Date, newWatch.Place, newWatch.Note)

		/*
			err := verifyCoffee(newMvo)
			if err != nil {
				boom.BadData(w, err)
			} else {

				err = writeNewCoffee(w, newCoffee)
				if err != nil {
					boom.Internal(w, "Error while trying to create new Coffee")
				}
			}
		*/

		movieList = append(movieList, newMovie)
		w.Header().Add("Content-Type", "application/json")
		json.NewEncoder(w).Encode(newMovie)
	}
}

func (movie *Movie) setId() {
	movie.Id = xid.New()
}

func addViewing(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, POST")

	if r.Method == "POST" {

		vars := mux.Vars(r)
		id := vars["id"]

		if !containsMovieById(movieList, id) {
			boom.BadRequest(w, "No Movie by that ID")
		} else {
			reqBody, _ := ioutil.ReadAll(r.Body)
			fmt.Println("reqBody ", string(reqBody))

			var newWatch Watch
			json.Unmarshal(reqBody, &newWatch)

			mxidm, _ := xid.FromString(id)
			movieIndex, _ := getMovieIndexFromList(mxidm)

			fmt.Println("movielist index movie: ", movieList[movieIndex].Name)

			movieList[movieIndex].Watches = append(movieList[movieIndex].Watches, newWatch)

			fmt.Printf("new Viewing details: \nMovie Name: %s \nDate: %s \nPlace: %s\nNote: %s\n", movieList[movieIndex].Name, newWatch.Date, newWatch.Place, newWatch.Note)
			w.Header().Add("Content-Type", "application/json")
			json.NewEncoder(w).Encode(newWatch)

		}
	}

}

func getMovieIndexFromList(xid xid.ID) (int, error) {

	for i, m := range movieList {
		if xid == m.Id {
			return i, nil
		}

	}
	return -1, errors.New("No movie found by that Id")
}

func containsMovieById(ml []Movie, id string) bool {
	for _, m := range ml {
		if (m.Id).String() == id {
			return true
		}
	}
	return false
}

func logRequest(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Request:\n       Method: %s\n       URL: %s\n       Referer: %s\n", r.Method, r.URL, r.Referer())
		h.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

func editMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, PUT")

	if r.Method == "PUT" {

		vars := mux.Vars(r)
		id := vars["id"]
		fmt.Printf("PUT ID: %s\n", id)

		if !containsMovieById(movieList, id) {
			boom.BadRequest(w, "No Movie by that ID")
		} else {
			reqBody, _ := ioutil.ReadAll(r.Body)
			fmt.Println("reqBody ", string(reqBody))

			var newMovie EditMovie
			json.Unmarshal(reqBody, &newMovie)

			mxidm, _ := xid.FromString(id)
			movieIndex, _ := getMovieIndexFromList(mxidm)

			fmt.Println("movielist index movie: ", movieList[movieIndex].Name)

			movieList[movieIndex].modifyMovie(newMovie)

			fmt.Printf("new Edited details: \n   Movie Name: %s \n   Year: %d\n   Rating: %d\n   Review: %s\n ", movieList[movieIndex].Name, movieList[movieIndex].Year, movieList[movieIndex].Rating, movieList[movieIndex].Review)

			w.Header().Add("Content-Type", "application/json")
			json.NewEncoder(w).Encode(movieList[movieIndex])

		}
	}
}

func (m *Movie) modifyMovie(newMovie EditMovie) {
	fmt.Printf("new name: %s, new year: %d\n", (&newMovie).Name, &newMovie.Year)
	m.Name = newMovie.Name
	m.Year = newMovie.Year
	m.Rating = newMovie.Rating
	m.Review = newMovie.Review
}

func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", home)
	router.HandleFunc("/movies", movies)
	router.HandleFunc("/nothing", nothing)
	router.HandleFunc("/movies/add", addMovie).Methods("POST", "OPTIONS")
	router.HandleFunc("/movies/{id}/viewing/add", addViewing).Methods("POST", "OPTIONS")
	router.HandleFunc("/movies/{id}/edit", editMovie).Methods("PUT", "OPTIONS")
	/*
		originsOk := handlers.AllowedOrigins([]string{"http://localhost:3000"})
		headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Access-Control-Allow-Origin: *"})
		methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})
	*/
	// log.Fatal(http.ListenAndServe(":10000", toLowerCase(handlers.CORS(originsOk, headersOk, methodsOk)(router))))
	log.Fatal(http.ListenAndServe(":10000", toLowerCase(logRequest(router))))
}

func main() {
	fmt.Println("Setting up a server on http://localhost:10000")
	handleRequests()
}
