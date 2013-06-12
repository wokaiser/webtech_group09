# Accessing an SQL database

## Configuring JDBC connection pools

Play 2.0 provides a plug-in for managing JDBC connection pools. You can configure as many databases you need.

To enable the database plug-in, configure a connection pool in the `conf/application.conf` file. By convention, the default JDBC data source must be called `default` and the corresponding configuration properties are `db.default.driver` and `db.default.url`.

If something isn’t properly configured you will be notified directly in your browser:

[[images/dbError.png]]

> **Note:** You likely need to enclose the JDBC URL configuration value with double quotes, since ':' is a reserved character in the configuration syntax.

### H2 database engine connection properties

```properties
# Default database configuration using H2 database engine in an in-memory mode
db.default.driver=org.h2.Driver
db.default.url="jdbc:h2:mem:play"
```

```properties
# Default database configuration using H2 database engine in a persistent mode
db.default.driver=org.h2.Driver
db.default.url="jdbc:h2:/path/to/db-file"
```

The details of the H2 database URLs are found from [[H2 Database Engine Cheat Sheet |http://www.h2database.com/html/cheatSheet.html]].

### SQLite database engine connection properties

```properties
# Default database configuration using SQLite database engine
db.default.driver=org.sqlite.JDBC
db.default.url="jdbc:sqlite:/path/to/db-file"
```

### PostgreSQL database engine connection properties

```properties
# Default database configuration using PostgreSQL database engine
db.default.driver=org.postgresql.Driver
db.default.url="jdbc:postgresql://database.example.com/playdb"
```

## How to configure several data sources

```properties
# Orders database
db.orders.driver=org.h2.Driver
db.orders.url="jdbc:h2:mem:orders"

# Customers database
db.customers.driver=org.h2.Driver
db.customers.url="jdbc:h2:mem:customers"
```

## Configuring the JDBC Driver

Play 2.0 in bundled only with an [[H2 | http://www.h2database.com]] database driver. Consequently, to deploy in production you will need to add your database driver as a dependency.

For example, if you use MySQL5, you need to add a [[dependency | SBTDependencies]] for the connector:

```scala
val appDependencies = Seq(
  "mysql" % "mysql-connector-java" % "5.1.18"
)
```

Or if the driver can't be found from repositories you can drop the driver into your project's [[unmanaged dependencies|Anatomy]] `lib` directory.

## Accessing the JDBC datasource

The `play.api.db` package provides access to the configured data sources:

```scala
import play.api.db._

val ds = DB.getDataSource()
```

## Obtaining a JDBC connection

There is several ways to retrieve a JDBC connection. The first is the most simple:

```scala
val connection = DB.getConnection()
```

But of course you need to call `close()` at some point on the opened connection to return it to the connection pool. Another way is to let Play manage closing the connection for you:

```scala
// access "default" database
DB.withConnection { conn =>
  // do whatever you need with the connection
}
```

For a database other than the default:

```scala
// access "orders" database instead of "default"
DB.withConnection("orders") { conn =>
  // do whatever you need with the connection
}
```

The connection will be automatically closed at the end of the block.

> **Tip:** Each `Statement` and `ResultSet` created with this connection will be closed as well.

A variant is to set the connection auto-commit to `false` automatically and to manage a transaction for the block:

```scala
DB.withTransaction { conn =>
  // do whatever you need with the connection
}
```

> **Next:** [[Using Anorm to access your database | ScalaAnorm]]