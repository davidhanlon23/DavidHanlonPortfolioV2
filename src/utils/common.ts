export function getDivHeight(height){
	switch (height) {
		case 'screen':
			height= `h-screen`;
			break;
		case '100':
		    height = `h-full`;
		    break;
		case '80':
		    height = `h-4/5	`;
		    break;
		case '75':
		    height = `h-3/4`;
		    break;
        case '50':
            height = `h-1/2`;	
			break;
		default:
		    height = `h-auto`;
	}
	return height;
}