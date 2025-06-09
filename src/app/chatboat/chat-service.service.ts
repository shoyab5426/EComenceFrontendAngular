import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private faqMap: { [question: string]: string } = {};

   constructor(private http: HttpClient) {
    this.loadFAQ();
  }

  private loadFAQ() {
    this.http.get('/faqs.txt', { responseType: 'text' }).subscribe(data => {
      const lines = data.split('\n');
      lines.forEach(line => {
        const [question, answer] = line.split('::');
        if (question && answer) {
          this.faqMap[question.trim().toLowerCase()] = answer.trim();
        }
      });
    });
  }

  getAnswer(userInput: string): string {
    const key = userInput.trim().toLowerCase();
    return this.faqMap[key] || "Sorry, I don't have an answer for that.";
  }
}
