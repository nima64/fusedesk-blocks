## About ##
These are a set of gutenberg blocks made for the FuseDesk plugin.

The source for all blocks are located in the `blocks` folder and local dependencies are located in lib.  

All InspectorControl controls are rendered through createControlRenderer.  
The controls' states are saved in attributes, see explantion on attributes (https://reaktiv.co/blog/gutenberg-attributes/).  
Their representation/model is saved in controlsData.  

So to create a control, you must create an attribute and it's model.   
The model must bind the attribute.   

## About The Build System ##
At the core the blocks are registered with [register_block_type_from_meta_data](https://developer.wordpress.org/reference/functions/register_block_type_from_metadata/), it only requires the directory where the block.json is located. Since it always looks for the file name block.json we have to seperate the block.jsons by folders hence why we have to keep the folder structure in the build.  

## Building Blocks ##
To build a block
```
npm run buildblock --block=blockname
```
To watch, do the same except with ```startblock --block=blockname```  


## Building pot and json files for localization ##  
See (https://developer.wordpress.org/block-editor/how-to-guides/internationalization/)  
