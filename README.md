# Session App Boilerplate code - Node version

A quick start app using the node and the session builder for crafting session apps.

## First step: name

Every **session app** must have a proper name. This name will be used as the namespace for the output fields of the app and will also be used in the path of the request.

name: sessionappnode

## Required files

An app is a **session app** if it has the **session builder**
```
...,
"builders": {
    ...,
    "vtex.session": "0.x"
  },
  ...
```
*manifest.json*

This builder requires a **configuration.json** file in the **vtex.session** folder with the following format:
```
{
	"sessionappnode": {
		"input": {
			"public": [ "field_name" ],
            "any_other_namespace": ["any_field1", "other_field"]		
		},
		"output": {
			"sessionappnode": [ "output_field" ]
		}		
	}
}
```

## Required routes

A session app must have a public route with the following path *{{name}}/transform*.
```
...
"routes": {    
    ...,
    "transform": {
      "path": "/sessionappnode/transform",
      "public": true
    }
  },
```
*service.json*


This route must be a POST that will receive the following request body:
```
{
	"namespace1": {
		"fieldname": {
			"value": "anything"
		},
		"fieldname2": {
			"value": "anything2"
		}
	},
    "namespace2": {
		"fieldname": {
			"value": "anything3"
		},
		"fieldname2": {
			"value": "anything4"
		}
	}
}
```

The route response must be of the following format:
```
{
	"sessionappnode": {
		"output_field": {
			"value": "anything"
		}	
	}
}
```
Where **sessionappnode** is the name of the app and **output_field** was declared in the *configuration.json* file.