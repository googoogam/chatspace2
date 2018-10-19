# README

[前のリポジトリ](https://github.com/googoogam/chat-spaceold)


## users_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index:true|
|email|string|null: false, unique:true|
|password|string|null: false|

### Association
- has_many :members
- has_many :groups, through: :menbers
- has_many :messages

## groups_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages

## members_table
|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messages_table
|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key:true|
|body|text||
|image|string||

### Association
- belongs_to :group
- belongs_to :user
