package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/darahayes/go-boom"
	"github.com/gorilla/mux"
)

type Movie struct {
	Id       int       `json:"Id"`
	Name     string    `json:"Name"`
	Rating   int       `json:"Rating"`
	Review   string    `json:"Review"`
	Watches  []Watch   `json:"Watches"`
	Comments []Comment `json:"Comments"`
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

	json.NewEncoder(w).Encode(movieList)
}

// ENDPOINT Lisää listan
func addMovie(w http.ResponseWriter, r *http.Request) {
	//w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")

	fmt.Println("method", r.Method)
	if r.Method == "POST" {

		reqBody, _ := ioutil.ReadAll(r.Body)
		fmt.Println("reqBody ", string(reqBody))
		var newMovie Movie
		json.Unmarshal(reqBody, &newMovie)

		var newWatch Watch
		json.Unmarshal(reqBody, &newWatch)
		if !newWatch.Date.IsZero() {
			newMovie.Watches = append(newMovie.Watches, newWatch)
		}
		fmt.Printf("new Movie details: \nName: %s \nReview: %s\nRating: %d\nDate: %s\nPlace: %s\nNote: %s\n ", newMovie.Name, newMovie.Review, newMovie.Rating, newWatch.Date, newWatch.Place, newWatch.Note)
		// Tsekataan, että kaikki on kunnossa pyynnössä
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
		json.NewEncoder(w).Encode(newMovie)
	}
}

// funktio createNewCoffee ENDPOINTille
/*
func writeNewCoffee(w http.ResponseWriter, newCoffee Coffee) error {
	updateCoffeeList()
	// Luodaan uusi ID uudelle oliolle
	newCoffee.Id = setId()
	newCoffeeList := append(CoffeeList, newCoffee)

	file, err := json.MarshalIndent(newCoffeeList, "", " ")
	if err != nil {
		return err
	}
	err = ioutil.WriteFile("CoffeeList.json", file, 0777)
	if err != nil {
		return err
	}
	json.NewEncoder(w).Encode(newCoffee)
	fmt.Printf("Coffee added to the Coffee List: %s\n", *newCoffee.Name)
	updateCoffeeList()
	return nil
}
*/
func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", home)
	router.HandleFunc("/movies", movies)
	router.HandleFunc("/nothing", nothing)
	router.HandleFunc("/movies/add", addMovie).Methods("POST", "OPTIONS")

	/* router.HandleFunc("/becoffeelist", backendCoffeeList)
	router.HandleFunc("/coffeelist", returnCoffees).Methods("GET", "OPTIONS")
	router.HandleFunc("/coffee/{id}", returnSingleCoffee).Methods("GET", "OPTIONS")
	router.HandleFunc("/coffee/add", createNewCoffee).Methods("POST", "OPTIONS")
	router.HandleFunc("/coffee/delete/{id}", deleteCoffee).Methods("DELETE", "OPTIONS")
	*/
	/*
		originsOk := handlers.AllowedOrigins([]string{"http://localhost:3000"})
		headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Access-Control-Allow-Origin: *"})
		methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})
	*/
	// log.Fatal(http.ListenAndServe(":10000", toLowerCase(handlers.CORS(originsOk, headersOk, methodsOk)(router))))
	log.Fatal(http.ListenAndServe(":10000", toLowerCase(router)))
}

func main() {
	fmt.Println("Setting up a server on http://localhost:10000")
	// updateCoffeeList()
	/* movieList = []Movie{
		{
			Id:     1,
			Name:   "Movie 1",
			Rating: 9,
			Desc:   "Not much",
		},
		{
			Id:     2,
			Name:   "Movie 2",
			Rating: 4,
			Desc:   "Not much",
		},
	} */
	handleRequests()
}
