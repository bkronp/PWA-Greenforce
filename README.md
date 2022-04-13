# pwa_progenetic
Justo lo que buscabas.
### Version 0.1.0 - 2021/02/15

## Initial Config to proyect

1. git clone [repository_path]
2. npm i
3. config settings.json based in example settings.json.example
4. run migrates with command "npx knex migrate:latest"
5. run seeders with command "npx knex seed:run"
6. compile the project with command "npm run dev"
7. Enjoy! °----°

# Server Configuration

The settings are loaded from a file which must be called "settings.json" and placed in "src/Server/".

## Example of the settings file "settings.json"

```
{
	"settings" : {
		"server_url" : "http://localhost:3000",
		"purchasing" : {
			"disable_average_cost_calculation" : false
		}
	},
	"admin" : {
		"user_name"    : "root",
		"password"     : "root",
		"email"        : "kyele936@gmail.com",
		"employeeInfo" : {
			"first_name" : "Cesar",
			"last_name"  : "Herrera"
		}
	},
	"database" : {
		"host"     : "localhost",
		"port"     : 3306,
		"user"     : "root",
		"password" : "root",
		"database" : "progenetic_db",
		"charset"  : "utf8",
		"pooling" : {
			"minimum" : 1, 
			"maximum" : 100
		},
		"connectionTimeout" : 10000
	},	
	"security" : {
		"jwt_key"    : "progenetic_key_2021",
		"token_life" : "30 days",
		"ssl" : {
			"key_file"  : "/home/ssl/cert.key",
			"cert_file" : "/home/ssl/cert.crt",
			"enable"    : false
		},
		"disable_session_control" : false
	},
	"mail": {
		"user"             : "kyele936@gmail.com",
		"pass"             : "rdtxmxgqwjxlgzsd",
		"SENDGRID_API_KEY" : "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"
	},
	"debug" : true
}
```


# Routes

The API REST is organized as a set of modules and submodules, the route is formed by the name of the module follwed by the submodule(s) and last the specific actions or params.

**FORMAT: _< protocol >://< domain >/api/< module >[[/< submodule >[/< sub-submodule >]]][/< :param1 >[/< :param2 >]]_**
 
 * e.g. **http://my_domain.org/api/products/presentations/page/1** Brings a page of product presentations.

Generally the modules will have CRUD routes
 * **POST:** Additions:
  * Add one register uses _/api/< module >[/< submodule >[/< sub-submodule >]]/_.
 * **GET:** Consults:
  * Obtain all the available registers uses _/api/< module >[/< submodule >[/< sub-submodule >]]/_ (Just a few modules have this feature).
  * Get one specific register uses _/api/< module >[/< submodule >[/< sub-submodule >]]/:id_.
  * Get a page of registers uses _/api/< module >[/< submodule >[/< sub-submodule >]]/page/:page_.
 * **PATCH:** Updates:
  * Update one single register uses _/api/< module >[/< submodule >[/< sub-submodule >]]/:id_.
 * **DELETE:** Deletions:
  * Delete one single register uses _/api/< module >[/< submodule >[/< sub-submodule >]]/:id_.

The available modules are the following:

 1. Auth
 2. Products
 3. Files

## I. Auth

 1. Login **POST .../api/auth/login**

## II. Products

 1. Create a new product **POST .../api/products/create**
 2. Get product details **GET .../api/products/details/[productId]**
 3. Get product paginate **GET .../api/products/page/[pageNumber]**
 4. Get product catelogues **GET .../api/products/catalogues**

## III Files

 1. Get an image user or product **GET .../api/images/:category/:sizeOrId/:id**
 2. Get an file **GET .../api/files/:fileId**

## IV Emails
1. Send email for a contact **POST .../api/emails/contact**
