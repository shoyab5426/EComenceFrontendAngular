import { Component } from '@angular/core';
import { ChatServiceService } from '../../chatboat/chat-service.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messageControl = new FormControl('');
  chatHistory: { question: string; answer: string }[] = [];

  // Simulate bot answers from a simple map
  faqMap: { [key: string]: string } = {
    'hi':'Hi I am boat, How can i help you?',
    'Hi':'Hi I am boat, How can i help you?',
    'hii':'Hi I am boat, How can i help you?',
    'hiii':'Hi I am boat, How can i help you?',
    'Hii':'Hi I am boat, How can i help you?',
    'how do i track my order?': 'You can track your order by logging into your account.',
    'what is your return policy?': 'You can return most items within 30 days of delivery for a full refund.',
    'how long does delivery take?': 'Standard delivery takes 3-5 business days. Express options are available at checkout.',
    'do you offer cash on delivery?': 'Yes, we offer cash on delivery in selected areas.',
    'can i cancel my order?': 'Yes, you can cancel your order before it is shipped. Go to "My Orders" to cancel.',
    'how do i change my password?': 'Log into your account and go to Account Settings > Change Password.',
    'do you ship internationally?': 'Yes, we ship to over 50 countries worldwide.',
    'what payment methods are accepted?': 'We accept credit/debit cards, net banking, UPI, wallets, and cash on delivery.',
    'is my payment information secure?': 'Yes, we use industry-standard encryption to protect your data.',
    'do you offer gift wrapping?': 'Yes, gift wrapping is available at checkout for an additional charge.',
    'how can i contact customer support?': 'You can contact us via the support page or by calling our toll-free number.',
    'i received a damaged item. what should i do?': 'Please contact our support team with photos, and we’ll assist with a replacement or refund.',
    'can i change my shipping address after placing an order?': 'You can change the address before the order is shipped by contacting customer support.',
    'do i need an account to place an order?': 'No, you can place an order as a guest, but having an account offers more features.',
    'how do i apply a discount code?': 'Enter the discount code at checkout in the promo code field.',
    'are there any membership benefits?': 'Yes, members get early access to sales, exclusive offers, and reward points.'
  };

  sendMessage() {
    const userMessage = this.messageControl.value?.trim();
    if (!userMessage) return;

    const lower = userMessage.toLowerCase();
    const botReply = this.faqMap[lower] || "Sorry, I don't have an answer for that.";

    this.chatHistory.push({ question: userMessage, answer: botReply });
    this.messageControl.reset();
  }
}
