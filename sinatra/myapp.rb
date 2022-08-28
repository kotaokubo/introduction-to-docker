require 'sinatra'
require 'sinatra/reloader'
require 'mysql2'

get '/' do
  'Hello world!aaaaa'
end

get '/api/hello' do
  { message: 'Hello world!' }.to_json
end

get '/api/tasks' do
  client = connect
  result = client.query('select id, title, created_at from tasks')
  tasks = result.map do |row|
    { id: row['id'], title: row['title'], createdAt: row['created_at'] }
  end
  client.close
  { tasks: tasks }.to_json
end

post '/api/tasks' do
  request_body = JSON.parse(request.body.read)
  client = connect

  statement = client.prepare('insert into tasks(title) value (?)')
  statement.execute(request_body['title'])

  client.close
end

def connect
  Mysql2::Client.new(
    host: 'mysql',
    database: 'mydb',
    username: 'myuser',
    password: 'password',
    connect_timeout: 5
  )
end