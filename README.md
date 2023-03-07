
## API Reference

#### Find Ticked ID
```http
  POST /find-id-ticket
```
- Body:
```javascript
{
    "start_time": "2023/03/05 00:00:00",
    "end_time": "2023/03/05 23:59:59",
    "game_categories": ["Pg2Slot"],
    "ticket_id": "1632285351752101888",
    "site": "f8bet"
}
```
 - Result - Success:
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

