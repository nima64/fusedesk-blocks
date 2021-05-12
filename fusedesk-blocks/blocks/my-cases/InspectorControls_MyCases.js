import { 
    Panel,
    PanelBody,
} from '@wordpress/components';
import {
    InspectorControls,
    InspectorAdvancedControls
} from '@wordpress/block-editor';
import ControlsData from './ControlsData';
import createControlRenderer from '../../lib/createControlRenderer';

/**
 * @param props
 * @returns InspectorControls and IspectorAdvancedControls
 */
export function InspectorControls_MyCases(props,cases){

	const renderControlObj = createControlRenderer( props );

    const getDisplayPlanel = () => {
        const DisplayGroup = ControlsData.display;
        return (
            <Panel>
                <PanelBody title="Display">
                    {renderControlObj(DisplayGroup.columns)}
                    {renderControlObj(DisplayGroup.status)}
                    {renderControlObj(DisplayGroup.userstatuses)}
                    {renderControlObj(DisplayGroup.orderby)}
                    {/* {renderControlObj(DisplayGroup.orderby, null, (v) =>{
                        console.log(v);
                        cases.sort( (a,b) => a['date_updated'] > b['date_updated'] );
                        return v;
                    } )} */}
                    {renderControlObj(DisplayGroup.dateformat)}
                    {renderControlObj(DisplayGroup.limit)}
                    {/* { Object.entries(DisplayGroup).map( ([name,obj] ) => 
                        renderControlObj(obj) )
                    } */}
                </PanelBody>
            </Panel>
        );
    };

    const getTextPanel = () => {
        const TextGroup = ControlsData.text;
        const TextColumnsGroup = ControlsData.text_columns;

        const selectedColumns = props.attributes.columns.map(({val, id}) => id + "_name" );
        const avaliableLabels = selectedColumns.filter( (col_name) => TextColumnsGroup[col_name] != undefined ); 
        const columnLabels = avaliableLabels.map( (col_name) => TextColumnsGroup[col_name] );
        return (
            <Panel>
                <PanelBody title="Text">
                    {
                        columnLabels.map( obj => renderControlObj(obj) )
                    }
                    { 
                        Object.entries(TextGroup).map( ([name,obj]) => 
                            renderControlObj(obj) )
                    }
                </PanelBody>
            </Panel>
        );
    };

    const getAdvancedPanel = () => {
        const AdvancedGroup = ControlsData.advanced;
        return (
			<>
                {/* replaces spaces with dashes */}
				{ renderControlObj(AdvancedGroup.anchor ,'advanced',(v) => v.slice(-1) == ' '? v.slice(0,-1) + '-' : v ) }
				{ renderControlObj(AdvancedGroup.style ,'advanced') }
			</>
        );
    };

    return (
        <>
        <InspectorControls>
            { getDisplayPlanel() }
            { getTextPanel() }
        </InspectorControls>
        <InspectorAdvancedControls>
            { getAdvancedPanel() }
        </InspectorAdvancedControls>
        </>
    );
}
