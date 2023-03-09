## API Reference
### List
 - [Ticket ID](#ticket-id)
 - [Game Categories](#game-categories)
 - [Add Point](#add-point)
 - [Find Memo](#find-memo)
 - [Check Vé Gộp](#check-ve-gop)
 - [Get Time Zone](#get-time-zone)
 - [Get Member BO](#get-member-bo)


<a name='ticket-id'></a>

## Ticket ID
### Find Ticked ID
```http
  POST /find-id-ticket
```
**Body:**
```javascript
{
    "start_time": "2023/03/05 00:00:00",
    "end_time": "2023/03/05 23:59:59",
    "game_categories": ["Pg2Slot"],
    "ticket_id": "1632285351752101888",
    "site": "f8bet"
}
```
**Result - Success:**
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
<a name='game-categories'></a>

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
**Body:**
```javascript
{
    "game_categories_id": "nohu",
    "game_categories": ["Pg2Slot", "BngSlot", "Cq9Slot"]
}
```
**Result - Success:**
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
**Body:**
```javascript
{
    "game_categories_id": "nohu",
    "game_categories": ["Pg2Slot", "BngSlot", "Cq9Slot"]
}
```
<a name='find-memo'></a>

## Find Memo
```http
  POST /find-memo
```
**Body:**
```javascript
{
    "Account": "xuxian",
    "TimeBegin": "2023/01/01 00:00:00",
    "TimeEnd": "2023/01/01 23:59:59",
    "Memo": "SH8888",
    "site": "f8bet"
}
```
**Result:**
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
<a name='add-point'></a>

## Add Point
### Find Ticked ID
```http
  POST /add-point-bo
```
**Body:**
```javascript
{
    "AccountsString": "iris",
    "Amount": "1",
    "Audit": "1",
    "Memo": "test2",
    "PortalMemo": "test1",
    "TimeStamp": 1675491502650,
    "site": "f8bet"
}
```
*Ghi chú:*
- `Amount` : Điểm thưởng
- `Audit` : Điểm thưởng * vòng cược
- `Memo` : Ghi chú
- `PortalMemo` : Ghi chú trang đầu
- `TimeStamp` : Thời gian cộng điểm (hiện tại)

**Result - Success:**
 ```javascript
{
    "Code": 200,
    "Error": [],
    "ReplyTime": "/Date(1678111424599)/",
    "Result": {
        "List": [
            {
                "Account": "iris",
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
**Result - Not Found Account:**
 ```javascript
{
    "ReturnObject": null,
    "IsSuccess": false,
    "ErrorMessage": "會員【iris】不存在"
}
```
**Result - Success:**
 ```javascript
true
```
<a name='check-ve-gop'></a>

## Check Vé Gộp
```http
  POST /check-ve-gop
```
**Body:**
```javascript
{
    "account": "hungnguyen030",
    "start_time": "2023/03/01 00:00:00",
    "end_time": "2023/03/01 23:59:59",
    "game_categories": ["Pg2Slot"],
    "site": "f8bet"
}
```
**Result - Success:**
 ```javascript
{
    "Code": 200,
    "Error": [],
    "ReplyTime": "/Date(1678111424599)/",
    "Result": {
        "List": [
            {
                "Account": "iris",
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
<a name='get-time-zone'></a>

## Get Time Zone
```http
  GET /get-timeZone
```


| Parameter            | Type     | Description                              |
| :------------------- | :------- | :--------------------------------------- |
| `timeZone`           | `string` | **Required**. Full IANA time zone names. |

*Ví dụ:*
- `timeZone` : America/Santiago


**Result - Success:**
 ```javascript
{
    "status_code": 200,
    "valid": true,
    "result": {
        "year": 2023,
        "month": 3,
        "day": 9,
        "hour": 0,
        "minute": 57,
        "seconds": 38,
        "milliSeconds": 155,
        "dateTime": "2023-03-09T00:57:38.1555535",
        "date": "03/09/2023",
        "time": "00:57",
        "timeZone": "America/Santiago",
        "dayOfWeek": "Thursday",
        "dstActive": true
    }
}
```

**Result - Error:**
 ```javascript
{
    "status_code": 400,
    "valid": false,
    "mess": "Bad Request"
}
```
<a name='get-member-bo'></a>

## Get Member BO
```http
  GET /game-member-bo
```

| Parameter            | Type     | Description                    |
| :------------------- | :------- | :----------------------------- |
| `site`               | `string` | **Required**                   |
| `player_id`          | `string` |  **Required**                  |

**Result - Success:**
 ```javascript
{
    "status_code": 200,
    "valid": true,
    "account": "iris"
}
```
**Result - Error:**
 ```javascript
{
    "status_code": 404,
    "valid": false,
    "mess": 'Không tìm thấy thấy tài khoản hoặc tài khoản bị sai. Vui lòng thử lại.',
    "account": "iris"
}