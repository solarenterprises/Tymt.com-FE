export const replaceStr = (str) => {
    return str.split(' ').map((word, index) => (
        word === 'tymt' ? <span key={`tymt ${str}`}><strong className="italic" key={index}>tymt</strong>&trade;&nbsp;</span> : word +" "
    ));
}