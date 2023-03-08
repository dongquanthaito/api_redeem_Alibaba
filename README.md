
## API Reference

## Ticket ID
### Find Ticked ID
```http
  POST /find-id-ticket
```
*Body:*
```javascript
{
    "start_time": "2023/03/05 00:00:00",
    "end_time": "2023/03/05 23:59:59",
    "game_categories": ["Pg2Slot"],
    "ticket_id": "1632285351752101888",
    "site": "f8bet"
}
```
*Result - Success:*
 ```javascript
{
    "Code": 200,
    "Error": [],
    "ReplyTime": "/Date(1678111424599)/",
    "Result": {
        "List": [
            {
                "Account": "hungnguyen030",
                "BetAmount": 4,
                "Commissionable": 4,
                "GameCategory": "PG2 Điện tử",
                "GameType": "Đường Mạt Chược 2",
                "Id": 14179174,
                "Payoff": -4,
                "PayoffTime": "/Date(1677959452387)/",
                "RawDataId": 74876777,
                "RawDataType": 144,
                "WagersTime": "/Date(1677958928893)/"
            }
        ]
    }
}
```
## Game Categories
### Get All
```http
  GET /game-categories
```

| Parameter            | Type     | Description                    |
| :------------------- | :------- | :----------------------------- |
| `game_categories_id` | `string` | **Required**. This is Promo ID |
| `site`               | `string` |  **Required**                  |




### Create
```http
  POST /game-categories/create
```
*Body:*
```javascript
{
    "game_categories_id": "nohu",
    "game_categories": ["Pg2Slot", "BngSlot", "Cq9Slot"]
}
```
*Result - Success:*
 ```javascript
{
    "status_code": 200,
    "valid": true,
    "mess": "Create Successfully",
    "result": {
        "game_categories_id": "nohu",
        "game_categories": [
            "Pg2Slot",
            "BngSlot",
            "Cq9Slot"
        ],
        "_id": "640600905798846d0f6475ca",
        "__v": 0
    }
}
```
### Update
```http
  POST /game-categories/update
```
*Body:*
```javascript
{
    "game_categories_id": "nohu",
    "game_categories": ["Pg2Slot", "BngSlot", "Cq9Slot"]
}
```
### Find Memo
```http
  POST /find-memo
```
*Body:*
```javascript
{
    "Account": "xuxian",
    "TimeBegin": "2023/01/01 00:00:00",
    "TimeEnd": "2023/01/01 23:59:59",
    "Memo": "SH8888",
    "site": "f8bet"
}
```
 *Result:*
 ```javascript
{
    "status_code": 200,
    "valid": false,
    "mess": "Đã nhận khuyến mãi.",
}
```
 ```javascript
{
    "status_code": 400,
    "valid": true,
    "mess": "Chưa nhận khuyến mãi.",
}
```
## Add Point
### Find Ticked ID
```http
  POST /add-point-bo
```
*Body:*
```javascript
{
    "AccountsString": "xuxian",
    "Amount": "1",
    "Audit": "1",
    "Memo": "test2",
    "PortalMemo": "test1",
    "TimeStamp": 1675491502650,
    "site": "f8bet"
}
```
*Result - Success:*
 ```javascript
{
    "Code": 200,
    "Error": [],
    "ReplyTime": "/Date(1678111424599)/",
    "Result": {
        "List": [
            {
                "Account": "hungnguyen030",
                "BetAmount": 4,
                "Commissionable": 4,
                "GameCategory": "PG2 Điện tử",
                "GameType": "Đường Mạt Chược 2",
                "Id": 14179174,
                "Payoff": -4,
                "PayoffTime": "/Date(1677959452387)/",
                "RawDataId": 74876777,
                "RawDataType": 144,
                "WagersTime": "/Date(1677958928893)/"
            }
        ]
    }
}
```

