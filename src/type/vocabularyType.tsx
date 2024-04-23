import React from "react"

export type vocabularyType = {
    word: {
        text: string,
        audio: string
    },
    explain: [{
        text: string,
        audio: string
    }],
    example: [{
        text: string,
        audio: string
    }],
}[] 