function drawAnnotation(from, to, text) {
  jQuery('.annotorious-annotationlayer').simulate('mouseover');
  jQuery('.annotorious-item').simulate('mousedown', { clientX: from.x, clientY: from.y });
  jQuery('.annotorious-item').simulate('mousemove', { clientX: to.x, clientY: to.y });
  jQuery('.annotorious-item').simulate('mouseup');
  jQuery('.annotorious-editor-text').val(text); 
  jQuery('.annotorious-editor-button-save').simulate('click');
}

function editAnnotation(pos, text) {
  jQuery('.annotorious-item').simulate('mousemove', { clientX: pos.x, clientY: pos.y });
  jQuery('.annotorious-popup-button-edit').simulate('click');
  jQuery('.annotorious-editor-text').val(text); 
  jQuery('.annotorious-editor-button-save').simulate('click');
}

function deleteAnnotation(pos) {
  jQuery('.annotorious-item').simulate('mousemove', { clientX: pos.x, clientY: pos.y });
  jQuery('.annotorious-popup-button-delete').simulate('click');
}

jQuery(function() {
  jQuery('#run').click(function() {

    // Create annotation #1
    drawAnnotation({x:445, y:195}, {x:500, y:355}, 'Church.');
    test("Annotation #1 Created", function() {
      var annotations = anno.getAnnotations();
      ok(annotations.length == 1);
      ok(annotations[0].text == 'Church.');
    });

    // Create annotation #2
    drawAnnotation({x:425, y:220}, {x:650, y:370}, 'Hallstatt.');
    test("Annotation #2 Created", function() {
      var annotations = anno.getAnnotations();
      ok(annotations.length == 2);
      ok(annotations[0].text == 'Church.');
      ok(annotations[1].text == 'Hallstatt.');
    });

    // Edit annotation #1
    editAnnotation({x:475, y:196}, 'A church in Hallstatt.');
    test("Annotation #1 Updated", function() {
      var annotations = anno.getAnnotations();
      ok(annotations[0].text == 'Hallstatt.');
      ok(annotations[1].text == 'A church in Hallstatt.');
    });

    // Delete annotation #2
    deleteAnnotation({x:502,y:280});
    test("Annotation #2 Deleted", function() {
      var annotations = anno.getAnnotations();
      ok(annotations.length == 1);
      ok(annotations[0].text == 'A church in Hallstatt.');
    });

  });
});
