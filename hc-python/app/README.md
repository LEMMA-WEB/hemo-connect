## Endpoints

### /
- request
- response
    ```html
    <p>Hello, HemoConnect!</p>
    ```


### /diagnosis
- description
    endpoint returns all diagnoses
- request
- response
    return: 
    ```json
    ["C911", ...]
    ```
### /diagnosis/<diagnose_id>/patient
- description
    endpoint returns all patients for specific diagnose
- request
    - diagnose_id string: "C911"
- response
    return :
    ```json
    [
        {
            "first_dat": "2023-12-05",
            "gen_mark": "GHV",
            "ic_pac": "1091",
            "last_dat": "2023-12-05",
            "text_dg": ["CLL, KONTROLA"]
        },
        ...
    ]
    ```

### /diagnosis/<diagnose_id>/patient/<patient_id>
- description
    endpoint returns all patient records for specific diagnose
- request
    - diagnose_id string: "C911"
    - patient_id string: "1091"
- response
    ```json
    [
        {
            "amb_zaz_text": "Odběr:25.01.2023 10:41 ...",
            "cas_zad": "12:11:00",
            "dat_zad": "2023-01-25",
            "dg_kod": "",
            "i_dg_kod": "C911",
            "i_text_dg": "Chron.lymfocytární leukémie                                 ",
            "ic_amb_karta": "1162492",
            "ic_amb_zad": "25933638",
            "ic_pac": "1091",
            "poz_text": "",
            "prac_od": "41742",
            "text_dg": "ko Bry                                                      "
        },
        ...
    ]
    ```

### /diagnosis/<diagnose_id>/patient/<patient_id>/info
- description
    endpoint returns info about single patient ... similar to /diagnosis/<diagnose_id>/patient endpoint bu just for oe patient
- request
    - diagnose_id string: "C911"
    - patient_id string: "1091"
- response
    return: 
    ```json
    [
        {
            "first_dat": "2023-12-05",
            "gen_mark": "GHV",
            "ic_pac": "1091",
            "last_dat": "2023-12-05",
            "text_dg": ["CLL, KONTROLA"]
        }
    ]
    ```


### /diagnosis/<diagnose_id>/patient/<patient_id>/chat
- description 
    endpoint based on query returns results searched in unstructured field
- request
    - diagnose_id string: "C911"
    - patient_id string: "1091"
    - quality? double: 0.1 (default 0.01) //quality under which we should filter out the result searched by vector database
    - limit? int: 2 (default 1) //limit how many results from the vector database i should use and send it to the llm
    - query string: "Rai" //query based on which should be find out the best match in vector database and which is used to search the result with llm
- response
    return: llm response paired with the original record
    ```json
    {
        "data": [
            {
            "id": "25965488",
            "sentence": "7.12.22 odběr prognostikcých faktorů, Rai OA            flow 7.12.23 typický fenotyp B CLL            mutace TP 53 negativní            IGVH 91,32% mutovaný            cytogenetika zatím není",
            "sentence_from_start": 123,
            "sentence_length": 120,
            "value": "Rai OA"
            },
            ...
        ],
        "original": [
            {
            "amb_zaz_text": "... Rai OA            flow 7.12.23 typický fenotyp B CLL ...",
            "cas_zad": "12:33:00",
            "confidence": ".14370739749703534404",
            "dat_zad": "2023-01-18",
            "dg_kod": "",
            "i_dg_kod": "C911 ",
            "i_text_dg": "Chronická lymfocytická leukemie z B-buněk                   ",
            "ic_amb_karta": "6502779",
            "ic_amb_zad": "25965488",
            "ic_pac": "87049",
            "poz_text": "",
            "prac_od": "41742",
            "text_dg": "kontrola                                                    "
            },
            ...
        ]
    }
    ```



### /patient/info
- description
    endpoint return all patients
- request
- response
    ```json
    [
        {
            "first_dat": "2023-12-05",
            "gen_mark": "GHV",
            "ic_pac": "1091",
            "last_dat": "2023-12-05",
            "text_dg": ["CLL, KONTROLA"]
        },
        ...
    ]
    ```
