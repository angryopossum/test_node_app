var name = {"name": "Вася", "age": 30};

function PropertyError(property) {
    Error.call(this, property);
    this.name = "PropertyError";
    
    this.property = property;
    this.message = "Ошибка в свойстве" + property;
    
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, PropertyError);
        
    } else { 
        this.stack = (new Error()).stack;
        
    }
}

PropertyError.prototype = Object.create(Error.prototype);

// Генерация ошибки
function readUser(data) {

  var user = JSON.parse(data);

  if (!user.age) {
    throw new PropertyError("age");
  }

  if (!user.name) {
    throw new PropertyError("name");
  }

  return user;
}

// Запуск и try..catch

try {
  var user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof PropertyError) {
    if (err.property == 'name') {
      // если в данном месте кода возможны анонимы, то всё нормально
      alert( "Здравствуйте, Аноним!" );
    } else {
      alert( err.message ); // Ошибка в свойстве ...
    }
  } else if (err instanceof SyntaxError) {
    alert( "Ошибка в синтаксисе данных: " + err.message );
  } else {
    throw err; // неизвестная ошибка, не знаю что с ней делать
  }
}