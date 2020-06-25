# NY Times Scrapper

**Requires subscription to NY Times Cooking.** 

This is my procedure for scrapping my recipes from my NY Times recipe cart and putting them to a book in word format: for easy offline retrieval.  

I am using MySQL and Node.JS to create a database of recipes.  If you do not have access to Microsoft Access, you may find a node package that can output correctly formatted .docx.  I didn't find one I was happy with, and found I could import the database into Access, and create a macro for outputting formatted word recipes.  I take them and add them to one Word document.  That document is formatted as a book, with a full table of contents.

The Node app is started with server.js.  There are different routes.  I haven't worked on the view recipes page.  With the Enter Recipe page, you will be able to see what new recipes you enter with the browser console (I also included some print on the server side as well).  Copy the html from the body of the recipe section, and paste it into "Input HTML".  You can select what category to make it.  Then that recipe gets added as a new row in the DB.

When you are ready to write that data as Word docs, you can import your database to Access and include this code:
```
Option Compare Database
Option Explicit

Public Sub ExportRecipesToWord()
    Dim wApp As Word.Application
    Dim wDoc As Word.Document
    Dim rs As DAO.Recordset
    
    Set wApp = New Word.Application
    Set wDoc = wApp.Documents.Open("C:\[user]\Documents\recipes\NYT_scrapper\recipes.docx")
    Set rs = CurrentDb.OpenRecordset("recipes")
    
    If Not rs.EOF Then rs.MoveFirst
    
    Do Until rs.EOF
        wDoc.Bookmarks("category").Range.Text = Nz(rs!Category, "")
        wDoc.Bookmarks("title").Range.Text = Nz(rs!recipe_title, "")
        wDoc.Bookmarks("author").Range.Text = Nz(rs!author_name, "")
        wDoc.Bookmarks("summary").Range.Text = Nz(rs!summary, "")
        wDoc.Bookmarks("ingredients").Range.Text = Nz(rs!ingredients, "")
        wDoc.Bookmarks("steps").Range.Text = Nz(rs!steps, "")
        wDoc.Bookmarks("notes").Range.Text = Nz(rs!notes, "")
        wDoc.SaveAs2 "C:\[user]\Documents\recipes\NYT_scrapper\individual\" & rs!item_id & "_recipes.docx"
        
        wDoc.Bookmarks("category").Range.Delete wdCharacter, Len(Nz(rs!Category, ""))
        wDoc.Bookmarks("title").Range.Delete wdCharacter, Len(Nz(rs!recipe_title, ""))
        wDoc.Bookmarks("author").Range.Delete wdCharacter, Len(Nz(rs!author_name, ""))
        wDoc.Bookmarks("summary").Range.Delete wdCharacter, Len(Nz(rs!summary, ""))
        wDoc.Bookmarks("ingredients").Range.Delete wdCharacter, Len(Nz(rs!ingredients, ""))
        wDoc.Bookmarks("steps").Range.Delete wdCharacter, Len(Nz(rs!steps, ""))
        wDoc.Bookmarks("notes").Range.Delete wdCharacter, Len(Nz(rs!notes, ""))
        
        rs.MoveNext
    Loop
    
    wDoc.Close False
    wApp.Quit
    
    Set wDoc = Nothing
    Set wApp = Nothing
    Set rs = Nothing
    
End Sub
```
recipes.docx is my template file, where I've set styling for the different segments. wDoc.SaveAs2 is the output folder, where I save individual recipes incrementally. The lines above SaveAs2 write each block taken from the database names.
