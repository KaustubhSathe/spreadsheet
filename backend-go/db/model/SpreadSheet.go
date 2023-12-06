package model

import (
	"encoding/json"
	"time"
)

// This struct represents the SpreadSheet object stored in DB
type SpreadSheet struct {
	Base
	UserName         string
	UserID           int64
	SpreadSheetTitle string
	Favorited        bool
	CSVs             []string // Will contain pointer to S3 objects
	LastOpened       time.Time
}

func (in *SpreadSheet) Stringify() string {
	b, err := json.Marshal(in)
	if err != nil {
		return ""
	}
	return string(b)
}

func StringifySpreadSheets(in []*SpreadSheet) string {
	b, err := json.Marshal(in)
	if err != nil {
		return ""
	}
	return string(b)
}